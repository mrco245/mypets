import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NaviagationComponent } from '../navigation/navagation.component';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../shared/services/auth.service';

export interface Pet {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const PET_DATA: Pet[] = [];

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NaviagationComponent,
    MatTable,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent{
  constructor(private authService: AuthService) {}
 
  readonly dialog = inject(MatDialog);

  displayedColumns: string[] = [
    'species',
    'name',
    'breed',
    'age',
    'weight',
    'altered',
    'birthdate',
    'adoptiondate',
  ];

  dataSource: Pet[] = [...PET_DATA]
  @ViewChild(MatTable) table: MatTable<Pet>;

 
  addPet() {
    const dialogRef = this.dialog.open(AddPetDialog);
    dialogRef.afterClosed().subscribe(async (result: Pet) => {
      // Add a new document in collection "cities"
      this.authService.afs.collection('pets').doc(this.authService.userData.uid).collection('pets').add(result);
      this.dataSource.push(result);
      this.table.renderRows();
    });
  }

 getPets() {
    const markers: any[] = [];
    this.authService.afs.collection('pets').doc(this.authService.userData.uid).collection('pets').get()
      .subscribe((querySnapshot: { docs: any[]; }) => {
        querySnapshot.docs.forEach((doc: { data: () => any; }) => {
          this.dataSource.push(doc.data());
        });
      });
    return markers;
   }
}

@Component({
  selector: 'add-pet-dialog',
  templateUrl: 'add-pet-dialog.html',
  standalone: true,
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPetDialog implements OnInit {
  petForm: FormGroup;

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.petForm = new FormGroup({
      name: new FormControl('', Validators.required),
      species: new FormControl('', Validators.required),
      breed: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
    });
  }
}
