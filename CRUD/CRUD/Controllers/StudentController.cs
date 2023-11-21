using CRUD.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CRUD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly StudentDbContext _studentDbContext;

        public StudentController(StudentDbContext studentDbContext)
        {
            _studentDbContext = studentDbContext;
        }

        [HttpGet]
        [Route("GetStudent")]
        public async Task<IEnumerable<Students>> GetStudents()
        {
            return await _studentDbContext.Student.ToListAsync();
        }

        [HttpPost]
        [Route("AddStudent")]
        public async Task<Students> AddStudent(Students objStudent)
        {
            _studentDbContext.Student.Add(objStudent);
            await _studentDbContext.SaveChangesAsync();
            return objStudent;
        }

        [HttpPatch]
        [Route("UpdateStudent/{id}")]
        public async Task<Students> UpdateStudent(Students objStudent)
        {
            _studentDbContext.Entry(objStudent).State = EntityState.Modified;
            await _studentDbContext.SaveChangesAsync();
            return objStudent;
        }

        [HttpDelete]
        [Route("DeleteStudent/{id}")]
        public bool DeleteStudent(int id)
        {
            bool isDeleted = false;
            var student = _studentDbContext.Student.Find(id);
            if (student != null)
            {
                isDeleted = true;
                _studentDbContext.Entry(student).State = EntityState.Deleted;
                _studentDbContext.SaveChanges();
            }
            else
            {
                isDeleted = false;
            }
            return isDeleted;
        }
    }
}
