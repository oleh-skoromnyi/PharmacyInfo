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
        private readonly string connectionString;

        IRepository<Patient> patientRepository;
        IRepository<Pharmacy> pharmacyRepository;

        public HomeController()
        {
            connectionString = System.Configuration.ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;

            patientRepository = new PatientRepository(connectionString);
            pharmacyRepository = new PharmacyRepository(connectionString);
        }

        [HttpGet]
        public JsonResult GetPatients()
        {
            var patients = patientRepository.FindAll();
            return Json(patients, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetPharmacies()
        {
            var pharmacies = pharmacyRepository.FindAll();
            return Json(pharmacies, JsonRequestBehavior.AllowGet);
        }

        public JsonResult PutPatients(List<Patient> json)
        {
            Console.WriteLine(json);
            return Json("Ok", JsonRequestBehavior.AllowGet);
        }

        public JsonResult PutPharmacies(List<Pharmacy> json)
        {
            Console.WriteLine(json);
            return Json("Ok", JsonRequestBehavior.AllowGet);
        }
    }
}