using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using PharmacyInfo.Core.Entities;
using PharmasyInfo.Core.Interfaces;

namespace PharmacyInfo.DataAccessLayer
{
    public class PharmacyRepository : IRepository<Pharmacy>
    {
        private const string getStoredProcedureName = "GetPharmacies";
        private const string addStoredProcedureName = "CreatePharmacy";

        private string _connectionString;
        public PharmacyRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void AddEntity(Pharmacy entity)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                var command = new SqlCommand(addStoredProcedureName, connection);
                command.CommandType = System.Data.CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@PharmacyName", entity.PharmacyName);
                command.Parameters.AddWithValue("@StreetAddress", entity.StreetAddress);
                command.Parameters.AddWithValue("@StateCode", entity.StateCode);
                command.Parameters.AddWithValue("@ZipCode", entity.ZipCode);
                command.Parameters.AddWithValue("@PhoneNumber", entity.PhoneNumber);

                connection.Open();
                command.ExecuteNonQuery();
            }
        }

        public List<Pharmacy> FindAll()
        {
            var resultList = new List<Pharmacy>();
            using (var connection = new SqlConnection(_connectionString))
            {
                var command = new SqlCommand(getStoredProcedureName, connection);
                command.CommandType = System.Data.CommandType.StoredProcedure;
                connection.Open();
                var reader = command.ExecuteReader();
                var listItem = new Pharmacy();

                foreach (var row in reader)
                {
                    var info = new PatientInfo();
                    var hasInfo = false;
                    for (int i = 0; i < reader.FieldCount; ++i)
                    {
                        if (reader.GetName(i) == "Id" && (int)reader.GetValue(i) != listItem.Id && listItem.Id != 0)
                        {
                            resultList.Add(listItem);
                            listItem = new Pharmacy();
                        }
                        var property = typeof(Pharmacy).GetProperty(reader.GetName(i));
                        if (!(property is null))
                        {
                            typeof(Pharmacy).GetProperty(reader.GetName(i))?.SetValue(listItem, reader.GetValue(i));
                        }
                        else
                        {
                            if (reader.GetName(i) == "PatientId" && !(reader.GetValue(i) is DBNull))
                            {
                                hasInfo = true;
                            }
                            if (hasInfo)
                            {
                                typeof(PatientInfo).GetProperty(reader.GetName(i))?.SetValue(info, reader.GetValue(i));
                            }
                        }
                    }
                    if (listItem.Patients == null)
                    {
                        listItem.Patients = new List<PatientInfo>();
                    }
                    if (hasInfo)
                    {
                        listItem.Patients.Add(info); 
                    }
                }
                resultList.Add(listItem);
            }
            return resultList;
        }
    }
}
