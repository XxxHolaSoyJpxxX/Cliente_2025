interface IUsuario {
	nombre:string;
	edad:number;
	mail:string;
}

class Usuario implements IUsuario{
	nombre!: string;
	edad!: number;
	mail!: string;

	getAge(){
		return this.nombre;
	}
}

const arreglo: number[] = [4,5,6,7];
const array: Array<number|boolean>=[4,5,6,7,true]