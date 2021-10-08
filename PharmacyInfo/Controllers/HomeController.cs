using PharmasyInfo.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PharmacyInfo.DataAccessLayer;
using PharmacyInfo.Core.Entities;
using PharmacyInfo.Models;

namespace PharmacyInfo.Controllers
{
    public class HomeController : Controller
    {
        private const string connectionString = "Server=SKOROMNYI;Database=PharmacyInfo;Trusted_Connection=True;";

        IRepository<Patient> patientRepository = new PatientRepository(connectionString);
        IRepository<Pharmacy> pharmasyRepository = new PharmacyRepository(connectionString);


        public ActionResult Patients()
        {
            return View(new PatientViewModel { Patients = patientRepository.FindAll() });
        }

        public ActionResult Pharmacies()
        {
            return View(new PharmacyViewModel { Pharmacies = pharmasyRepository.FindAll() });
        }
    }
}