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
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import { UserService } from '../../services/data.service';
import { DatePipe } from '@angular/common';

export interface Pet {
  species: string;
  name: string;
  breed: string;
  age: number;
  weight: number;
  altered: boolean;
  birthdate: Date;
  adoptiondate: Date;
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
    DatePipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  dataSource: Pet[] = [...PET_DATA];

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

  @ViewChild(MatTable) table: MatTable<Pet>;

  constructor(private authService: UserService) {
  }
  ngOnInit(): void {
      this.authService.getPets().subscribe({
        next: (data) => {
          console.log(data);
          for(const pet of data.pets){
            const newPet: Pet = {
              species: pet.species,
              name: pet.name,
              breed: pet.breed,
              age: pet.age,
              weight: pet.weight,
              altered: pet.altered,
              birthdate: pet.birthdate,
              adoptiondate: pet.adoptiondate
            }
            this.dataSource.push(newPet);
          }
          this.table.renderRows();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
    
  addPet() {
    const dialogRef = this.dialog.open(AddPetDialog);
    dialogRef.afterClosed().subscribe(async (result: Pet) => {
      this.dataSource.push(result);
      this.authService.addPet(result).subscribe({
        next: (data) => {
          console.log(data);
          this.table.renderRows();
        },
        error: (err) => {
          console.log(err);
        },
      });
     
    });
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
    MatSelectModule,
    MatDatepickerModule
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
      weight: new FormControl('', Validators.required),
      birthdate: new FormControl('', Validators.required),
      adoptiondate: new FormControl('', Validators.required),
      altered: new FormControl('', Validators.required)
    });
  }
}
