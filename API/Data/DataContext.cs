using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options):base(options)
        {
        }
        public DbSet<AppUser> Users { get; set; }
        public DbSet<UserLike> Likes { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<UserLike>()
                .HasKey(k => new {k.SourceUserId, k.TargetUserId});
            // we can write new Object{k.SourceUserId, k.TargetUserId} or directly can write new {}

            builder.Entity<UserLike>()
                .HasOne(s => s.SourceUser)              //lisa can like
                .WithMany(l => l.LikedUsers)            //piter, bob and many others
                .HasForeignKey(s => s.SourceUserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<UserLike>()
                .HasOne(s => s.TargetUser)              //lisa get like from
                .WithMany(l => l.LikedByUsers)            //piter, bob and many others
                .HasForeignKey(s => s.TargetUserId)
                .OnDelete(DeleteBehavior.Cascade);      //if using sql server then DeleteBehaviour.NoAction if 2 entity actions are defined
        }
    }
}