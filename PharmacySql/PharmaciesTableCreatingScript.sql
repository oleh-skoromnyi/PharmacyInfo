CREATE TABLE Pharmacies (
	Id int not null primary key identity,
	PharmacyName nvarchar(100),
	StreetAddress nvarchar(100),
	StateCode int,
	ZipCode nvarchar(10),
	PhoneNumber nvarchar(20)
)

