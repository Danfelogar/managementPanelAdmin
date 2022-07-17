export interface ISeguimiento {
    _id: string

    id_seguimiento: string
    imgDeVerificación: string

    comentario: string
    estadoDeLaMaquina: string
    nombreDeObservador: string

    tiempoDeFuncionamiento: string
    tiempoDeReparación: string

    maquina_id_relacion: string | string[]

    createdAt: string
    updatedAt: string
}
