CREATE PROCEDURE GetPharmacies
AS
Select * from Pharmacies

CREATE PROCEDURE GetClients 
AS
Select Clients.Id, FirstName, LastName, PharmacyAssignDate, PharmacyName from Clients Inner join Pharmacies on Clients.PharmacyId = Pharmacies.Id