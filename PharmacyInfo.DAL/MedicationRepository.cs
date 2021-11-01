using PharmacyInfo.Core.Entities;
using PharmacyInfo.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace PharmacyInfo.DataAccessLayer
{
    public class MedicationRepository : IRepository<Medication>
    {
        private const string getStoredProcedureName = "GetMedications";

        private string _connectionString;
        public MedicationRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void AddEntity(Medication entity)
        {
            throw new NotImplementedException();
        }

        public List<Medication> FindAll()
        {
            var resultList = new List<Medication>();

            using (var connection = new SqlConnection(_connectionString))
            {
                var command = new SqlCommand(getStoredProcedureName, connection);
                command.CommandType = System.Data.CommandType.StoredProcedure;
                connection.Open();
                var reader = command.ExecuteReader();
                var listItem = new Medication();

                foreach (var row in reader)
                {
                    var info = new PharmacyItemInfo();
                    var hasInfo = false;
                    for (int i = 0; i < reader.FieldCount; ++i)
                    {
                        if (reader.GetName(i) == "Id" && (int)reader.GetValue(i) != listItem.Id && listItem.Id != 0)
                        {
                            resultList.Add(listItem);
                            listItem = new Medication();
                        }
                        var property = typeof(Medication).GetProperty(reader.GetName(i));
                        if (!(property is null))
                        {
                            typeof(Medication).GetProperty(reader.GetName(i))?.SetValue(listItem, reader.GetValue(i));
                        }
                        else
                        {
                            if (reader.GetName(i) == "PharmacyId" && !(reader.GetValue(i) is DBNull))
                            {
                                hasInfo = true;
                            }
                            if (hasInfo)
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
