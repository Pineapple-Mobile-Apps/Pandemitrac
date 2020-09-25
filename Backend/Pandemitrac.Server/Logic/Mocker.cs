using System;
using Pandemitrac.Server.Models;
using Pandemitrac.Server.Models.Core;
using Pandemitrac.Server.Models.Input;

namespace Pandemitrac.Server.Logic
{

    public class Mocker
    {

        private readonly DatabaseContext _db;

        public Mocker(DatabaseContext db)
        {
            _db = db;
        }

        public void Mock()
        {
            var visitor = new Visitor
            {
                Name = "Tim Ittermann"
            };

            _db.Visitors.Add(visitor);
            _db.SaveChanges();

            var @case = new Case
            {
                SubjectId = visitor.Id,
                Created = DateTime.Now
            };
            _db.Cases.Add(@case);

            _db.SaveChanges();
        }

    }

}