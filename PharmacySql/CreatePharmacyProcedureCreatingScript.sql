CREATE PROCEDURE CreatePharmacy 
@PharmacyName nvarchar(100),
@StreetAddress nvarchar(100),
@StateCode int,
@ZipCode nvarchar(10),
@PhoneNumber nvarchar(20)
AS
Insert Into Pharmacies(PharmacyName,StreetAddress,StateCode,ZipCode,PhoneNumber)
	Values (@PharmacyName,@StreetAddress,@StateCode,@ZipCode,@PhoneNumber);
