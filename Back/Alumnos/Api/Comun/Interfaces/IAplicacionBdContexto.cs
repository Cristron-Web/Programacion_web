using Api.Entidades;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Api.Comun.Interfaces;

public interface IAplicacionBdContexto
{
    public DbSet<Usuario> Usuarios { get; set; }
    public DbSet<SesionUsuario> SesionesUsuario { get; set; }
    public DbSet<Producto> Productos { get; set; }
    public DbSet<Categoria> Categorias { get; set; }

    Task<int> SaveChangesAsync(CancellationToken cancelacionToken);
    int SaveChanges();
    Task<int> ExecutarSqlComandoAsync(string comandoSql, CancellationToken cancelacionToken);
    Task<int> ExecutarSqlComandoAsync(string comandoSql, IEnumerable<object> parametros, CancellationToken cancelacionToken);
    Task EmpezarTransaccionAsync();
    Task MandarTransaccionAsync();
    void CancelarTransaccion();
    void OnModelCreating(ModelBuilder modelBuilder);
}

public class AplicacionBdContexto : DbContext, IAplicacionBdContexto
{
    public AplicacionBdContexto(DbContextOptions<AplicacionBdContexto> options)
        : base(options) { }

    public DbSet<Usuario> Usuarios { get; set; }
    public DbSet<SesionUsuario> SesionesUsuario { get; set; }
    public DbSet<Producto> Productos { get; set; }
    public DbSet<Categoria> Categorias { get; set; }

    public void OnModelCreating(ModelBuilder modelBuilder)
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

    public async Task<int> SaveChangesAsync(CancellationToken cancelacionToken) => await base.SaveChangesAsync(cancelacionToken);
    public int SaveChanges() => base.SaveChanges();

    public async Task<int> ExecutarSqlComandoAsync(string comandoSql, CancellationToken cancelacionToken)
    {
        return await Database.ExecuteSqlRawAsync(comandoSql, cancelacionToken);
    }

    public async Task<int> ExecutarSqlComandoAsync(string comandoSql, IEnumerable<object> parametros, CancellationToken cancelacionToken)
    {
        return await Database.ExecuteSqlRawAsync(comandoSql, parametros, cancelacionToken);
    }

    public async Task EmpezarTransaccionAsync() => await Database.BeginTransactionAsync();
    public async Task MandarTransaccionAsync() => await Database.CommitTransactionAsync();
    public void CancelarTransaccion() => Database.RollbackTransaction();
}