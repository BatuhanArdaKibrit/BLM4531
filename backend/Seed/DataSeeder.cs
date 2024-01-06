using backend.Data;

namespace backend.Seed
{
    public static class DataSeeder
    {
        public static void Seed(this IHost host){
            using var scope = host.Services.CreateScope();
            using var context = scope.ServiceProvider.GetRequiredService<DataContext>();
            context.Database.EnsureCreated();
            AddUser(context);
        }

        private static void AddUser(DataContext context)
        {
            var user = context.Users.FirstOrDefault();
            if(user != null) return;
            //context.Users.Add()
        }
    }
}