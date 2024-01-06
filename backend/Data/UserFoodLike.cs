namespace backend.Data
{
    public class UserFoodLike
    {
        public int UserId {get;set;}
        public User User {get;set;}
        public int FoodId { get; set; }
        public Food Food {get;set;}
    }
}