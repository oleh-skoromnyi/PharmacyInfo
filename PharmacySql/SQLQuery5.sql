CREATE PROCEDURE CreateClient
@FirstName nvarchar(100),
@LastName nvarchar(100),
@PharmacyAssignDate date,
@PharmacyId int
AS
Insert Into Clients(FirstName,LastName,PharmacyAssignDate,PharmacyId)
	Values (@FirstName,@LastName,@PharmacyAssignDate,@PharmacyId);