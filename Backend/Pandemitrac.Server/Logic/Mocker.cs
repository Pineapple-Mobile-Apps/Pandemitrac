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
                Name = "Tim Ittermann",
                Address = "Musterstr. 123",
                City = "Herne",
                Mail = "tim.ittermann@rku-it.de",
                Phone = "+49151123456",
                PostCode = 44652
            };

            _db.Visitors.Add(visitor);
            _db.Visitors.AddRange(new Visitor
            {
                Name = "Sven Treutler"
            }, new Visitor
            {
                Name = "Dennis Terhoeven"
            },
            new Visitor
            {
                Name = "Jan Böhm"
            },
            new Visitor
            {
                Name = "Rudi Schefer"
            });
            _db.SaveChanges();

            var editor = new Editor
            {
                Name = "Beatrice Henrich"
            };
            _db.Editors.Add(editor);
            _db.SaveChanges();

            var @case = new Case
            {
                SubjectId = visitor.Id,
                Created = DateTime.Now,
                EditorId = editor.Id
            };
            _db.Cases.AddRange(@case, new Case
            {
                SubjectId = 2,
                Created = DateTime.Now,
                EditorId = editor.Id
            });
            _db.SaveChanges();
        }

    }

}