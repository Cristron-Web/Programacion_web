using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using System.Data;
using System.Reflection;
using Api.Comun.Interfaces;
using Api.Entidades;
namespace Api.Persistencia;

public class AplicacionBdContexto : DbContext, IAplicacionBdContexto
{
    private IDbContextTransaction _actualTransaccion;
    public AplicacionBdContexto(DbContextOptions opciones) : base(opciones)
    {
    }
    public DbSet<Usuario> Usuarios { get; set; }
    public DbSet<SesionUsuario> SesionesUsuario { get; set; }
    public DbSet<Producto> Productos { get; set; }
    public DbSet<Categoria> Categorias { get; set; }
    public DbSet<Mensajes> Mensajes { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configurar relaciones entre Producto y Categoría (Muchos a Muchos)
        modelBuilder.Entity<Producto>()
            .HasMany(p => p.Categorias)
            .WithMany(c => c.Productos);

        // Configurar relación entre Producto y Vendedor (Uno a Muchos)
        modelBuilder.Entity<Producto>()
            .HasOne(p => p.Vendedor)
            .WithMany(v => v.Productos)
            .HasForeignKey(p => p.VendedorID);
    }


    public override async Task<int> SaveChangesAsync(CancellationToken cancelacionToken = default)
    {
        foreach (var entrada in ChangeTracker.Entries<ISlug>())
        {
            if (entrada.State == EntityState.Added || entrada.State == EntityState.Modified)
            {
                var entidad = entrada.Entity;
                if (string.IsNullOrWhiteSpace(entidad.Slug))
                {
                    entidad.Slug = entidad.ObtenerDescripcionParaSlug().ToLower().Replace(" ", "-");
                }
            }
        }

        var resultado = await base.SaveChangesAsync(cancelacionToken);
        return resultado;
    }

    public async Task EmpezarTransaccionAsync()
    {
        if (_actualTransaccion != null)
        {
            return;
        }

        _actualTransaccion = await base.Database.BeginTransactionAsync(IsolationLevel.ReadCommitted)
            .ConfigureAwait(false);
    }

    public async Task MandarTransaccionAsync()
    {
        try
        {
            await SaveChangesAsync().ConfigureAwait(false);

            _actualTransaccion?.Commit();
        }
        catch
        {
            CancelarTransaccion();
            throw;
        }
        finally
        {
            if (_actualTransaccion != null)
            {
                _actualTransaccion.Dispose();
                _actualTransaccion = null;
            }
        }
    }

    public void CancelarTransaccion()
    {
        try
        {
            _actualTransaccion?.Rollback();
        }
        finally
        {
            if (_actualTransaccion != null)
            {
                _actualTransaccion.Dispose();
                _actualTransaccion = null;
            }
        }
    }

    public async Task<int> ExecutarSqlComandoAsync(string comandoSql, CancellationToken cancelacionToken)
    {
        return await base.Database.ExecuteSqlRawAsync(comandoSql, cancelacionToken);
    }

    public async Task<int> ExecutarSqlComandoAsync(string comandoSql, IEnumerable<object> parametros, CancellationToken cancelacionToken)
    {
        return await base.Database.ExecuteSqlRawAsync(comandoSql, parametros, cancelacionToken);
    }

    protected override void OnModelCreating(ModelBuilder constructor)
    {
        constructor.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        base.OnModelCreating(constructor);
    }

}
