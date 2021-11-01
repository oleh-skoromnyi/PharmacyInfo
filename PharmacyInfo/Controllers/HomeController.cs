using PharmacyInfo.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Web.Mvc;
using PharmacyInfo.DataAccessLayer;
using PharmacyInfo.Core.Entities;
using System.Configuration;

namespace PharmacyInfo.Controllers
{
    public class HomeController : Controller
    {
        private readonly string connectionString;
        IRepository<Patient> patientRepository;
        IRepository<Medication> medicationRepository;
        IRepository<Pharmacy> pharmacyRepository;

        public HomeController()
        {
            connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
            patientRepository = new PatientRepository(connectionString);
            pharmacyRepository = new PharmacyRepository(connectionString);
            medicationRepository = new MedicationRepository(connectionString);
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


        [HttpGet]
        public JsonResult GetMedications()
        {
            var medications = medicationRepository.FindAll();
            return Json(medications, JsonRequestBehavior.AllowGet);
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