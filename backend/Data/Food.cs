namespace backend.Data
{
    public class Food
    {
        public int Id { get; set; }
        public string Name { get; set; }=string.Empty;
        public string Type { get; set; }=string.Empty;
        public byte[] Image { get; set; }
        public string ImageName {get;set;}=string.Empty;
        public string Recipe { get; set; }
        public List<string> Ingredients { get; set; }
        public int CreatedBy {get;set;}
        public User User {get;set;}
        
    }
}