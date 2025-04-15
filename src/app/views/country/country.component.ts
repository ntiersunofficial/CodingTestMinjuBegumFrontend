import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { 
  ContainerComponent,
  RowComponent,
  ColComponent,
  CardGroupComponent,
  CardModule,
  CardBodyComponent,
  InputGroupComponent,
  InputGroupTextDirective,
  FormControlDirective,
  ButtonDirective,
  FormCheckComponent,
  FormCheckInputDirective,
  FormCheckLabelDirective,
  ModalModule
} from '@coreui/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { cilSearch, cilTrash, cilPencil, cilInfo, cibLgtm } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // ✅ <-- Add FormsModule here
    ContainerComponent,
    RowComponent,
    ColComponent,
    CardGroupComponent,
    CardModule,
    CardBodyComponent,
    InputGroupComponent,
    InputGroupTextDirective,
    FormControlDirective,
    ButtonDirective,
    FormCheckComponent,
    FormCheckInputDirective,
    FormCheckLabelDirective,
    IconDirective,
    ModalModule
    ],
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss'
})
export class CountryComponent implements OnInit {
  allCountries: any[] = [];
  searchCountriesList: any[] = [];
  countrydetail: any;
  searchTerm: string = '';
  currentPage = 1;
  itemsPerPage = 10;
  loading = false;
  icons = { cilSearch, cilTrash, cilPencil, cilInfo };
  modalVisible = false;
  // For template access to Math functions
  Math = Math;

  constructor(
    private countryService: CountryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCountries();
  }

  getCountries() {
    this.loading = true;
    this.countryService.getAllCountiries().subscribe({
      next: (response) => {
        this.allCountries = response;
        this.searchCountriesList = response;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
  async openModal(country: any) {
    this.router.navigate([], {
      queryParams: { modal: 'true' },
      queryParamsHandling: 'merge',
      skipLocationChange: true
    });
  
    try {
      this.loading = true;
      this.countrydetail = await lastValueFrom(
        this.countryService.getAllCountiryDetail(country.name, true) // true for modal request
      );
      this.modalVisible = true;
      console.log(this.countrydetail);
    } catch (error) {
      console.error('Error loading country details:', error);
      this.closeModal();
    } finally {
      this.loading = false;
    }
  }

  closeModal() {
    this.modalVisible = false;
    this.countrydetail = null;
    // Clear modal flag
    this.router.navigate([], {
      queryParams: { modal: null },
      queryParamsHandling: 'merge',
      skipLocationChange: true
    });
  }
  search() {
    this.loading = true;
    
    if (this.searchTerm.trim()) {
      // Case-insensitive search
      const searchTermLower = this.searchTerm.toLowerCase();
      
      // Filter countries where name matches search term
      this.searchCountriesList = this.allCountries.filter(country => 
        country.name.toLowerCase().includes(searchTermLower)
      );
      
      // If no exact matches, try partial matches
      if (this.searchCountriesList.length === 0) {
        this.searchCountriesList = this.allCountries.filter(country =>
          country.name.toLowerCase().indexOf(searchTermLower) !== -1
        );
      }
    } else {
      // If search term is empty, reset to full list
      this.searchCountriesList = [...this.allCountries];
      this.getCountries(); // Refresh data if needed
    }
    
    this.loading = false;
  }

  // Helper to format area
  formatArea(area: number): string {
    return new Intl.NumberFormat().format(area) + ' km²';
  }

  // Helper to format coordinates
  formatCoordinates(lat: number, lng: number): string {
    return `${lat}° N, ${lng}° W`;
  }

  get paginatedCountries() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.allCountries.slice(start, end);
  }

  get pageCount(): number {
    return Math.ceil(this.allCountries.length / this.itemsPerPage);
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }
}