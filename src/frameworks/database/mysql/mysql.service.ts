import { Injectable } from "@nestjs/common";
import * as abstract from "./core/abstract";
import * as entidades from "./entities";
import * as repositorios from "./repositories";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
@Injectable()
export class MySQLBaseDeDatosService implements abstract.IConexionDb{
    public categoria: abstract.ICategoriaRepository<entidades.CategoriaEntity>;
    public categoriaTipoProducto: abstract.ICategoriaTipoProductoRepository<entidades.CategoriaTipoProductoEntity>;
    public ciudad: abstract.ICiudadRepository<entidades.CiudadEntity>;
    public compra: abstract.ICompraRepository<entidades.CompraEntity>;
    public cupon: abstract.ICuponRepository<entidades.CuponDeDescuentoEntity>;
    public departamento: abstract.IDepartamentoRepository<entidades.DepartamentoEntity>;
    public detalleCompra: abstract.IDetalleCompraRepository<entidades.DetalleCompraEntity>;
    public detalleVenta: abstract.IDetalleVentaRepository<entidades.DetalleVentaEntity>;
    public direccion: abstract.IDireccionRepository<entidades.DireccionEntity>;
    public imagen: abstract.IImagenRepository<entidades.ImagenEntity>;
    public imagenProducto: abstract.IImagenProductoRepository<entidades.ImageProductoEntity>;
    public inventario: abstract.IInventarioRepository<entidades.InventarioEntity>;
    public inventarioProducto: abstract.IInventarioProductoRepository<entidades.InventarioProductoEntity>;
    public pais: abstract.IPaisRepository<entidades.PaisEntity>;
    public parametro: abstract.IParametroRepository<entidades.ParametroEntity>;
    public permisoModulo: abstract.IPermisoModuloRepository<entidades.PermisoModuloEntity>;
    public permisoParametro: abstract.IPermisoParametroRepository<entidades.PermisoParametroEntity>;
    public permisoParametroRuta: abstract.IPermisoParametroRutaRepository<entidades.PermisoParametroRutaEntity>;
    public permisoRol: abstract.IPermisoRolRepository<entidades.PermisoRolEntity>;
    public permisoRolModuloRuta: abstract.IPermisoRolModuloRutaRepository<entidades.PermisoRolModuloRutaEntity>;
    public permisoRuta: abstract.IPermisoRutaRepository<entidades.PermisoRutaEntity>;
    public precio: abstract.IPrecioRepository<entidades.PrecioEntity>;
    public producto: abstract.IProductoRepository<entidades.ProductoEntity>;
    public proovedor: abstract.IProovedorRepository<entidades.ProovedorEntity>;
    public registroDeAcceso: abstract.IRegistroDeAccesoRepository<entidades.RegistroDeAccesoEntity>;
    public tipoProducto: abstract.ITipoProductoRepository<entidades.TipoProductoEntity>;
    public usuario: abstract.IUsuarioRepository<entidades.UsuarioEntity>;
    public valorParametro: abstract.IValorParametroRepository<entidades.ValorParametroEntity>;
    public venta: abstract.IVentaRepository<entidades.VentaEntity>;

    constructor(
        @InjectRepository(entidades.CategoriaEntity) private readonly categoriaRepository: Repository<entidades.CategoriaEntity>,
        @InjectRepository(entidades.CategoriaTipoProductoEntity) private readonly categoriaTipoProductoRepository: Repository<entidades.CategoriaTipoProductoEntity>,
        @InjectRepository(entidades.CiudadEntity) private readonly ciudadRepository: Repository<entidades.CiudadEntity>,
        @InjectRepository(entidades.CompraEntity) private readonly compraRepository: Repository<entidades.CompraEntity>,
        @InjectRepository(entidades.CuponDeDescuentoEntity) private readonly cuponRepository: Repository<entidades.CuponDeDescuentoEntity>,
        @InjectRepository(entidades.DepartamentoEntity) private readonly departamentoRepository: Repository<entidades.DepartamentoEntity>,
        @InjectRepository(entidades.DetalleCompraEntity) private readonly detalleCompraRepository: Repository<entidades.DetalleCompraEntity>,
        @InjectRepository(entidades.DetalleVentaEntity) private readonly detalleVentaRepository: Repository<entidades.DetalleVentaEntity>,
        @InjectRepository(entidades.DireccionEntity) private readonly direccionRepository: Repository<entidades.DireccionEntity>,
        @InjectRepository(entidades.ImagenEntity) private readonly imagenRepository: Repository<entidades.ImagenEntity>,
        @InjectRepository(entidades.ImageProductoEntity) private readonly imagenProductoRepository: Repository<entidades.ImageProductoEntity>,
        @InjectRepository(entidades.InventarioEntity) private readonly inventarioRepository: Repository<entidades.InventarioEntity>,
        @InjectRepository(entidades.InventarioProductoEntity) private readonly inventarioProductoRepository: Repository<entidades.InventarioProductoEntity>,
        @InjectRepository(entidades.PaisEntity) private readonly paisRepository: Repository<entidades.PaisEntity>,
        @InjectRepository(entidades.ParametroEntity) private readonly parametroRepository: Repository<entidades.ParametroEntity>,
        @InjectRepository(entidades.PermisoModuloEntity) private readonly permisoModuloRepository: Repository<entidades.PermisoModuloEntity>,
        @InjectRepository(entidades.PermisoParametroEntity) private readonly permisoParametroRepository: Repository<entidades.PermisoParametroEntity>,
        @InjectRepository(entidades.PermisoParametroRutaEntity) private readonly permisoParametroRutaRepository: Repository<entidades.PermisoParametroRutaEntity>,
        @InjectRepository(entidades.PermisoRolEntity) private readonly permisoRolRepository: Repository<entidades.PermisoRolEntity>,
        @InjectRepository(entidades.PermisoRolModuloRutaEntity) private readonly permisoRolModuloRutaRepository: Repository<entidades.PermisoRolModuloRutaEntity>,
        @InjectRepository(entidades.PermisoRutaEntity) private readonly permisoRutaRepository: Repository<entidades.PermisoRutaEntity>,
        @InjectRepository(entidades.PrecioEntity) private readonly precioRepository: Repository<entidades.PrecioEntity>,
        @InjectRepository(entidades.ProductoEntity) private readonly productoRepository: Repository<entidades.ProductoEntity>,
        @InjectRepository(entidades.ProovedorEntity) private readonly proovedorRepository: Repository<entidades.ProovedorEntity>,
        @InjectRepository(entidades.RegistroDeAccesoEntity) private readonly registroDeAccesoRepository: Repository<entidades.RegistroDeAccesoEntity>,
        @InjectRepository(entidades.TipoProductoEntity) private readonly tipoProductoRepository: Repository<entidades.TipoProductoEntity>,
        @InjectRepository(entidades.UsuarioEntity) private readonly usuarioRepository: Repository<entidades.UsuarioEntity>,
        @InjectRepository(entidades.ValorParametroEntity) private readonly valorParametroRepository: Repository<entidades.ValorParametroEntity>,
        @InjectRepository(entidades.VentaEntity) private readonly ventaRepository: Repository<entidades.VentaEntity>,
        private readonly conexion: DataSource,
    ){}

    public async onApplicationBootstrap(){
        this.categoria = new repositorios.MySQLCategoriaRepository(this.categoriaRepository, this.conexion);
        this.categoriaTipoProducto = new repositorios.MySQLCategoriaTipoProductoRepository(this.categoriaTipoProductoRepository, this.conexion);
        this.ciudad = new repositorios.MySQLCiudadRepository(this.ciudadRepository, this.conexion);
        this.compra = new repositorios.MySQLCompraRepository(this.compraRepository, this.conexion);
        this.cupon = new repositorios.MySQLCuponRepository(this.cuponRepository, this.conexion);
        this.departamento = new repositorios.MySQLDepartamentoRepository(this.departamentoRepository, this.conexion);
        this.detalleCompra = new repositorios.MySQLDetalleCompraRepository(this.detalleCompraRepository, this.conexion);
        this.detalleVenta = new repositorios.MySQLDetalleVentaRepository(this.detalleVentaRepository, this.conexion);
        this.direccion = new repositorios.MySQLDireccionRepository(this.direccionRepository, this.conexion);
        this.imagen = new repositorios.MySQLImagenRepository(this.imagenRepository, this.conexion);
        this.imagenProducto = new repositorios.MySQLImagenProductoRepository(this.imagenProductoRepository, this.conexion);
        this.inventario = new repositorios.MySQLInventarioRepository(this.inventarioRepository, this.conexion);
        this.inventarioProducto = new repositorios.MySQLInventarioProductoRepository(this.inventarioProductoRepository, this.conexion);
        this.pais = new repositorios.MySQLPaisRepository(this.paisRepository, this.conexion);
        this.parametro = new repositorios.MySQLParametroRepository(this.parametroRepository, this.conexion);
        this.permisoModulo = new repositorios.MySQLPermisoModuloRepository(this.permisoModuloRepository, this.conexion);
        this.permisoParametro = new repositorios.MySQLPermisoParametroRepository(this.permisoParametroRepository, this.conexion);
        this.permisoParametroRuta = new repositorios.MySQLPermisoParametroRutaRepository(this.permisoParametroRutaRepository, this.conexion);
        this.permisoRol = new repositorios.MySQLPermisoRolRepository(this.permisoRolRepository, this.conexion);
        this.permisoRolModuloRuta = new repositorios.MySQLPermisoRolModuloRutaRepository(this.permisoRolModuloRutaRepository, this.conexion);
        this.permisoRuta = new repositorios.MySQLPermisoRutaRepository(this.permisoRutaRepository, this.conexion);
        this.precio = new repositorios.MySQLPrecioRepository(this.precioRepository, this.conexion);
        this.producto = new repositorios.MySQLProductoRepository(this.productoRepository, this.conexion);
        this.proovedor = new repositorios.MySQLProovedorRepository(this.proovedorRepository, this.conexion);
        this.registroDeAcceso = new repositorios.MySQLRegistroDeAccesoRepository(this.registroDeAccesoRepository, this.conexion);
        this.tipoProducto = new repositorios.MySQLTipoProductoRepository(this.tipoProductoRepository, this.conexion);
        this.usuario = new repositorios.MySQLUsuarioRepository(this.usuarioRepository, this.conexion);
        this.valorParametro = new repositorios.MySQLValorParametroRepository(this.valorParametroRepository, this.conexion);
        this.venta = new repositorios.MySQLVentaRepository(this.ventaRepository, this.conexion);
    }

}
