using System;
using System.Collections.Generic;
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
            var visitors = new List<Visitor>{
                new Visitor
            {
                Name = "Tim Ittermann",
                Address = "Musterstr. 123",
                City = "Herne",
                Mail = "tim.ittermann@rku-it.de",
                Phone = "+49151123456",
                PostCode = 44652
            }, new Visitor
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
            }};

            _db.Visitors.AddRange(visitors);
            _db.SaveChanges();

            var editor = new Editor
            {
                Name = "Beatrice Henrich"
            };
            _db.Editors.Add(editor);
            _db.SaveChanges();

            var @case = new Case
            {
                SubjectId = visitors[0].Id,
                Created = DateTime.Now,
                EditorId = editor.Id,
                DependentSubjects = new List<DependentSubject>{
                    new DependentSubject{
                        History = new List<ChangeDependentSubjectStateEntry>{
                            new ChangeDependentSubjectStateEntry{
                                CurrentState = DependentSubjectState.Pending,
                                DateTime = DateTime.Now
                            },
                            new ChangeDependentSubjectStateEntry{
                                CurrentState = DependentSubjectState.TestPending,
                                DateTime = DateTime.Now,
                                EditorId = editor.Id
                            }
                        },
                        VisitorId = visitors[1].Id
                    },
                    new DependentSubject{
                        History = new List<ChangeDependentSubjectStateEntry>{
                            new ChangeDependentSubjectStateEntry{
                                CurrentState = DependentSubjectState.Pending,
                                DateTime = DateTime.Now
                            }
                        },
                        VisitorId = visitors[2].Id
                    }
                }
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