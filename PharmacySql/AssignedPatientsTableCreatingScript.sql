Create table AssignedPatients(
PatientId int,
PharmacyId int,
constraint AssignedPatients_Patients_PatientId foreign key (PatientId) REFERENCES Patients(Id),
constraint AssignedPatients_Pharmacies_PharmacyId foreign key (PharmacyId) REFERENCES Pharmacies(Id),
)