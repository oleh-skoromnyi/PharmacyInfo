CREATE PROCEDURE GetMedications
AS
Select Medications.Id, Name, Pharmacies.Id as PharmacyId, PharmacyName from MedicationsInPharmacies 
	left join Medications on Medications.Id = MedicationsInPharmacies.MedicationId
	left join Pharmacies on Pharmacies.Id = MedicationsInPharmacies.PharmacyId
	order by Medications.Id