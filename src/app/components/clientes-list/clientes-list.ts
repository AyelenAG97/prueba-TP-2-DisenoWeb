import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core'
import { ClientesService } from '../../services/clientes-service'
import { Cliente } from '../../models/cliente'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-clientes-list',
  standalone: false,
  templateUrl: './clientes-list.html',
  styleUrl: './clientes-list.css',
  encapsulation: ViewEncapsulation.None
})
export class ClientesList implements OnInit {

  clienteList = new Array<Cliente>()
  dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

  nombre: string
  apellido: string
  direccion: string
  telefono: string
  bidones: number
  diaReparto: string

  id2: string
  nombre2: string
  apellido2: string
  direccion2: string
  telefono2: string
  bidones2: number
  diaReparto2: string

  @ViewChild('see') see: any
  @ViewChild('nombreInput') nombreInput!: ElementRef

  constructor(private clientesService: ClientesService, private modalService: NgbModal, private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {
    this.getAll()
  }

  // 1. Obtener y mostrar un listado de todos los objetos
  getAll() {
    this.clientesService.getAll().subscribe(response => {
      this.clienteList = response
      this.clearInputs()
    }, error => {
      console.log(error)
      alert('Error al obtener los clientes')
    })
  }

  // 3. Cargar todos los datos y agregar un nuevo objeto
  add() {
    if (this.nombre.trim() !== '' && this.apellido.trim() !== '' && this.direccion.trim() !== '' &&
      this.telefono.trim() !== '' && this.bidones > 0 && this.diaReparto !== '') {
      let cliente = new Cliente()
      cliente.nombre = this.nombre
      cliente.apellido = this.apellido
      cliente.direccion = this.direccion
      cliente.telefono = this.telefono
      cliente.bidones = this.bidones
      cliente.diaReparto = this.diaReparto
      this.clientesService.add(cliente).subscribe(() => {
        this.getAll()
      }, error => {
        console.log(error)
        alert('Error al agregar el cliente')
      })
    } else {
      alert('Complete todos los campos')
    }
  }

  // 2. Obtener y mostrar los datos de un objeto al hacer click en la tabla
  view(see: any, cliente: Cliente) {
    this.id2 = cliente.id
    this.nombre2 = cliente.nombre
    this.apellido2 = cliente.apellido
    this.direccion2 = cliente.direccion
    this.telefono2 = cliente.telefono
    this.bidones2 = cliente.bidones
    this.diaReparto2 = cliente.diaReparto
    this.modalService.open(see).result.then(result => {
      if (result === 'update') {
        this.update()
      } else if (result === 'delete') {
        this.delete(this.id2)
      }
    }, () => {
      this.clearInputs()
    })
  }

  // 4. A la opción 2, agregarle la funcionalidad para actualizar los datos de un objeto
  update() {
    if (this.nombre2.trim() !== '' && this.apellido2.trim() !== '' && this.direccion2.trim() !== '' &&
      this.telefono2.trim() !== '' && this.bidones2 > 0 && this.diaReparto2 !== '') {
      let cliente = new Cliente()
      cliente.id = this.id2
      cliente.nombre = this.nombre2
      cliente.apellido = this.apellido2
      cliente.direccion = this.direccion2
      cliente.telefono = this.telefono2
      cliente.bidones = this.bidones2
      cliente.diaReparto = this.diaReparto2
      this.clientesService.update(cliente).subscribe(() => {
        this.getAll()
      }, error => {
        console.log(error)
        alert('Error al actualizar el cliente')
      })
    } else {
      alert('Complete todos los campos')
    }
  }

  // 5. A la opción 2, agregarle la funcionalidad para dar de baja un objeto
  delete(id: string) {
    this.clientesService.delete(id).subscribe(() => {
      this.getAll()
    }, error => {
      console.log(error)
      alert('Error al borrar el cliente')
    })
  }

  clearInputs() {
    this.nombre = ''
    this.apellido = ''
    this.direccion = ''
    this.telefono = ''
    this.bidones = 0
    this.diaReparto = ''
    this.changeDetector.detectChanges()
    setTimeout(() => {
      if (this.nombreInput) {
        this.nombreInput.nativeElement.focus()
      }
    }, 100)
  }
}
