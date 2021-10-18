CREATE PROCEDURE GetPatients 
AS
Select Patients.Id, FirstName, LastName, PharmacyAssignDate, Pharmacies.Id as PharmacyId, PharmacyName from Patients 
	left join AssignedPatients on Patients.Id = AssignedPatients.PatientId
	left join Pharmacies on Pharmacies.Id = AssignedPatients.PharmacyId
	order by Id