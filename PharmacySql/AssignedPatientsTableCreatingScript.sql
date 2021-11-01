Create table MedicationsRequests(
PatientId int,
MedicationId int,
PharmacyId int,
MedicationCount int,
IsAccept bit,
constraint MedicationsRequests_Medications_MedicationId foreign key (MedicationId) REFERENCES Medications(Id),
constraint MedicationsRequests_Patients_PatientId foreign key (PatientId) REFERENCES Patients(Id),
constraint MedicationsRequests_Pharmacies_PharmacyId foreign key (PharmacyId) REFERENCES Pharmacies(Id),
)