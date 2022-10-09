import { Component } from '@angular/core';
import { servicioService } from './Servicio.service';
import { servicio } from './Servicio';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  Servicios: servicio[] = [];
  muestraFormulario = false;
  accion = "anadir Servicio";

  formularioServicio = new FormGroup({
    _id: new FormControl(''),
    servicio: new FormControl(''),
    usuario: new FormControl(''),
    contrasena: new FormControl(''),
    url: new FormControl(''),
    icon: new FormControl(''),
  });

  constructor(private servicioService: servicioService) {
    this.cargaServicios();
  }

  async cargaServicios() {
    this.Servicios = await this.servicioService.getServicios();
  }

  editaServicio(Servicio: servicio) {
    this.muestraFormulario = true;
    this.accion = "edita Servicio";
    this.formularioServicio.patchValue(Servicio);
  }

  async borraServicio(id: string) {
    await this.servicioService.deleteServicio(id);
    this.cargaServicios();
  }

  async submitServicio() {
    let Servicio = <servicio>this.formularioServicio.value;

    if (this.accion === "anadir Servicio") {
      await this.servicioService.addServicio(Servicio);
    } else {
      await this.servicioService.updateServicio(<string>Servicio["_id"], Servicio)
    }
    
    this.formularioServicio.reset();
    this.muestraFormulario = false;
    this.cargaServicios();
    this.accion = "anadir Servicio";
  }
}
