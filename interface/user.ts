export interface IUser {
    _id: string
    nombre: string
    email: string
    contrasena: string
    rol: 'super_admin' | 'admin_bodega' | 'bodega' | 'admin_mtto' | 'mtto'

    createdAt: string
    updatedAt: string
}
