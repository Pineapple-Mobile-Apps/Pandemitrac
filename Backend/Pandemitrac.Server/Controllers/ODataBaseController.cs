using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Pandemitrac.Server.Models;
using Pandemitrac.Server.Models.Core;

namespace Pandemitrac.Server.Controllers
{
    public abstract class ODataBaseController<T> : ODataController where T : ModelBase
    {
        protected DatabaseContext DatabaseContext { get; }

        public ODataBaseController(DatabaseContext databaseContext)
        {
            DatabaseContext = databaseContext;
        }

        protected virtual DbSet<T> GetEntitySet() => DatabaseContext.Set<T>();

        protected virtual async Task<T> FindEntityAsync(int id) => await GetEntitySet().FindAsync(id);

        #region Create

        [ODataRoute]
        public virtual async Task<IActionResult> Create([FromBody] T entity)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            await GetEntitySet().AddAsync(entity);
            await DatabaseContext.SaveChangesAsync();
            return Created(entity);
        }

        #endregion

        #region Read

        [ODataRoute]
        [EnableQuery(MaxExpansionDepth = 20)]
        [HttpGet]
        public virtual IQueryable<T> Get() => GetEntitySet().AsQueryable();

        [ODataRoute("({key})")]
        [EnableQuery(MaxExpansionDepth = 20)]
        [HttpGet]
        public virtual async Task<IActionResult> Get([FromODataUri] int key)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var entity = await FindEntityAsync(key);
            if (entity == null)
                return NotFound();
            return Ok(entity);
        }

        #endregion

        #region Update

        [ODataRoute("({key})")]
        [HttpPatch]
        public virtual async Task<IActionResult> Patch([FromODataUri] int key, Delta<T> deltaEntity)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var entity = await FindEntityAsync(key);
            if (entity == null)
                return NotFound();
            deltaEntity.Patch(entity);
            await DatabaseContext.SaveChangesAsync();
            return Ok(entity);
        }

        [ODataRoute("({key})")]
        [HttpPut]
        public virtual async Task<IActionResult> Put([FromODataUri] int key, T entity)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            if (key != entity.Id)
                return BadRequest();
            DatabaseContext.Entry(entity).State = EntityState.Modified;
            await DatabaseContext.SaveChangesAsync();
            return Updated(entity);
        }

        #endregion

        #region Delete

        [ODataRoute("({key})")]
        [HttpDelete]
        public virtual async Task<IActionResult> Delete([FromODataUri] int key)
        {
            if (!ModelState.IsValid)
                return BadRequest();
            var entity = await FindEntityAsync(key);
            if (entity == null)
                return NotFound();
            GetEntitySet().Remove(entity);
            await DatabaseContext.SaveChangesAsync();
            return NoContent();
        }

        #endregion
    }
}