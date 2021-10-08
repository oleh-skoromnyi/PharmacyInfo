CREATE PROCEDURE GetPharmacies
AS
Select * from Pharmacies

CREATE PROCEDURE GetPatients 
AS
Select Patients.Id, FirstName, LastName, PharmacyAssignDate, PharmacyName from Patients Inner join Pharmacies on Patients.PharmacyId = Pharmacies.Id