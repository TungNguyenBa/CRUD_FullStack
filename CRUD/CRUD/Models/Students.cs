using System.ComponentModel.DataAnnotations;

namespace CRUD.Models
{
    public class Students
    {
        [Key]
        public int id { get; set; }
        public string stname { get; set; }
        public string course { get; set; }
    }
}
