using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using PharmacyInfo.Core.Entities;
using PharmasyInfo.Core.Interfaces;

namespace PharmacyInfo.DataAccessLayer
{
    public class PatientRepository : IRepository<Patient>
    {
        private const string getStoredProcedureName = "GetPatients";
        private const string addStoredProcedureName = "CreatePatient";

        private string _connectionString;
        public PatientRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void AddEntity(Patient entity)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                var command = new SqlCommand(addStoredProcedureName, connection);
                command.CommandType = System.Data.CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@FirstName", entity.FirstName);
                command.Parameters.AddWithValue("@LastName", entity.LastName);
                command.Parameters.AddWithValue("@PharmacyAssignDate", entity.PharmacyAssignDate);

                connection.Open();
                command.ExecuteNonQuery();
            }
        }

        public List<Patient> FindAll()
        {
            var resultList = new List<Patient>();

            using (var connection = new SqlConnection(_connectionString))
            {
                var command = new SqlCommand(getStoredProcedureName, connection);
                command.CommandType = System.Data.CommandType.StoredProcedure;
                connection.Open();
                var reader = command.ExecuteReader();
                var listItem = new Patient();

                foreach (var row in reader)
                {
                    var info = new PharmacyItemInfo();
                    var hasInfo = false;
                    for (int i = 0; i < reader.FieldCount; ++i)
                    {
                        if(reader.GetName(i) == "Id" && (int)reader.GetValue(i) != listItem.Id && listItem.Id != 0)
                        {
                            resultList.Add(listItem);
                            listItem = new Patient();
                        }
                        var property = typeof(Patient).GetProperty(reader.GetName(i));
                        if (!(property is null))
                        {
                            typeof(Patient).GetProperty(reader.GetName(i))?.SetValue(listItem, reader.GetValue(i));
                        }
                        else 
                        {
                            if (reader.GetName(i) == "PharmacyId" && !(reader.GetValue(i) is DBNull))
                            {
                                hasInfo = true;
                            }
                            if(hasInfo)
                            {
                                typeof(PharmacyItemInfo).GetProperty(reader.GetName(i))?.SetValue(info, reader.GetValue(i)); 
                            }
                        }
                    }
                    if (listItem.Pharmacies == null)
                    {
                        listItem.Pharmacies = new List<PharmacyItemInfo>();
                    }
                    if (hasInfo)
                    { 
                        listItem.Pharmacies.Add(info);
                    }
                }
                resultList.Add(listItem);
            }
            return resultList;
        }
    }
}
