CREATE PROCEDURE GetPharmacies
AS
Select Pharmacies.Id, PharmacyName, StreetAddress ,StateCode, ZipCode, PhoneNumber, Patients.Id as PatientId, FirstName, LastName from Pharmacies 
	left join AssignedPatients on Pharmacies.Id = AssignedPatients.PharmacyId
	left join Patients on Patients.Id = AssignedPatients.PatientId
	Order by Pharmacies.Id