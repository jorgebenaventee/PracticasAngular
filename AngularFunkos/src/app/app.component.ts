import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterOutlet } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'
import { FunkoService } from './services/funko.service'
import { FunkoComponent } from './components/funko/funko.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule, FunkoComponent],
  providers: [FunkoService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  funkos: Funko[]

  constructor(private funkoService: FunkoService) {}

  ngOnInit() {
    this.funkoService.getFunkos().subscribe((funkos) => {
      // this.funkos = []
      this.funkos = funkos
    })
  }
}
