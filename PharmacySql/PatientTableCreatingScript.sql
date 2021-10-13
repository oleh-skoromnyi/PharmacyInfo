CREATE TABLE Patient(
	Id int not null primary key identity,
	FirstName nvarchar(100),
	LastName nvarchar(100),
	PharmacyAssignDate date,
	PharmacyId int,
	CONSTRAINT Clients_Pharmasies_PharmacyId FOREIGN KEY (PharmacyId) REFERENCES Pharmacies(Id)
)
