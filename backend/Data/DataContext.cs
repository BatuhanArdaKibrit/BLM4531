using System;
using System.Collections.Generic;
using System.IO.Compression;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options):
            base(options){ }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.UseSerialColumns();
            modelBuilder.Entity<UserFoodLike>()
                .HasKey(upl => new {upl.UserId,upl.FoodId});
            
            modelBuilder.Entity<UserFoodLike>()
                .HasOne(upl => upl.User)
                .WithMany(u => u.LikedFoods)
                .HasForeignKey(upl => upl.UserId);

            modelBuilder.Entity<UserFoodLike>()
                .HasOne(upl => upl.Food)
                .WithMany()
                .HasForeignKey(upl => upl.FoodId);

            modelBuilder.Entity<Food>()
                .HasOne(upl => upl.User)
                .WithMany(u => u.ListFoods)
                .HasForeignKey(upl => upl.CreatedBy);
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Food> Foods { get; set; }
        public DbSet<UserFoodLike> UserFoodLikes { get ; set; }
    }
}