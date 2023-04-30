import * as entidades from '../../entities';
import * as abstract from './';

export abstract class IConexionDb {
    public abstract categoria: abstract.ICategoriaRepository<entidades.CategoriaEntity>;
    public abstract categoriaTipoProducto: abstract.ICategoriaTipoProductoRepository<entidades.CategoriaTipoProductoEntity>;
    public abstract ciudad: abstract.ICiudadRepository<entidades.CiudadEntity>;
    public abstract compra: abstract.ICompraRepository<entidades.CompraEntity>;
    public abstract cupon: abstract.ICuponRepository<entidades.CuponDeDescuentoEntity>;
    public abstract departamento: abstract.IDepartamentoRepository<entidades.DepartamentoEntity>;
    public abstract detalleCompra: abstract.IDetalleCompraRepository<entidades.DetalleCompraEntity>;
    public abstract detalleVenta: abstract.IDetalleVentaRepository<entidades.DetalleVentaEntity>;
    public abstract direccion: abstract.IDireccionRepository<entidades.DireccionEntity>;
    public abstract imagen: abstract.IImagenRepository<entidades.ImagenEntity>;
    public abstract imagenProducto: abstract.IImagenProductoRepository<entidades.ImageProductoEntity>;
    public abstract inventario: abstract.IInventarioRepository<entidades.InventarioEntity>;
    public abstract inventarioProducto: abstract.IInventarioProductoRepository<entidades.InventarioProductoEntity>;
    public abstract pais: abstract.IPaisRepository<entidades.PaisEntity>;
    public abstract parametro: abstract.IParametroRepository<entidades.ParametroEntity>;
    public abstract permisoModulo: abstract.IPermisoModuloRepository<entidades.PermisoModuloEntity>;
    public abstract permisoParametro: abstract.IPermisoParametroRepository<entidades.PermisoParametroEntity>;
    public abstract permisoParametroRuta: abstract.IPermisoParametroRutaRepository<entidades.PermisoParametroRutaEntity>;
    public abstract permisoRol: abstract.IPermisoRolRepository<entidades.PermisoRolEntity>;
    public abstract permiso: abstract.IPermisoRepository<entidades.PermisoEntity>;
    public abstract permisoRuta: abstract.IPermisoRutaRepository<entidades.PermisoRutaEntity>;
    public abstract precio: abstract.IPrecioRepository<entidades.PrecioEntity>;
    public abstract producto: abstract.IProductoRepository<entidades.ProductoEntity>;
    public abstract proovedor: abstract.IProovedorRepository<entidades.ProovedorEntity>;
    public abstract registroDeAcceso: abstract.IRegistroDeAccesoRepository<entidades.RegistroDeAccesoEntity>;
    public abstract tipoProducto: abstract.ITipoProductoRepository<entidades.TipoProductoEntity>;
    public abstract usuario: abstract.IUsuarioRepository<entidades.UsuarioEntity>;
    public abstract valorParametro: abstract.IValorParametroRepository<entidades.ValorParametroEntity>;
    public abstract venta: abstract.IVentaRepository<entidades.VentaEntity>;
}
