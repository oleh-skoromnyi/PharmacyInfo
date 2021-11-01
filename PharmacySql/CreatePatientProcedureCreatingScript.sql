CREATE PROCEDURE CreatePatient
@FirstName nvarchar(100),
@LastName nvarchar(100),
@PharmacyAssignDate date
AS
Insert Into Patients(FirstName,LastName,PharmacyAssignDate)
	Values (@FirstName,@LastName,@PharmacyAssignDate);