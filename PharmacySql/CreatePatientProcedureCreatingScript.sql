CREATE PROCEDURE CreatePatient
@FirstName nvarchar(100),
@LastName nvarchar(100),
@PharmacyAssignDate date,
@PharmacyId int
AS
Insert Into Patients(FirstName,LastName,PharmacyAssignDate,PharmacyId)
	Values (@FirstName,@LastName,@PharmacyAssignDate,@PharmacyId);