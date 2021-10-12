using PharmasyInfo.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PharmacyInfo.DataAccessLayer;
using PharmacyInfo.Core.Entities;

namespace PharmacyInfo.Controllers
{
    public class HomeController : Controller
    {
        private const string connectionString = "Server=SKOROMNYI;Database=PharmacyInfo;Trusted_Connection=True;";

        IRepository<Patient> patientRepository = new PatientRepository(connectionString);
        IRepository<Pharmacy> pharmasyRepository = new PharmacyRepository(connectionString);

        [HttpGet]
        public JsonResult Patients()
        {
            var patients = patientRepository.FindAll();
            return Json(patients,JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Pharmacies()
        {
            var pharmacies = pharmasyRepository.FindAll();
            return Json(pharmacies, JsonRequestBehavior.AllowGet);
        }
    }
}