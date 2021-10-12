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
            var connection = new SqlConnection(_connectionString);
            using (var command = new SqlCommand(addStoredProcedureName, connection))
            {
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
            var connection = new SqlConnection(_connectionString);
            var resultList = new List<Pharmacy>();
            using (var command = new SqlCommand(getStoredProcedureName, connection))
            {
                command.CommandType = System.Data.CommandType.StoredProcedure;
                connection.Open();
                var reader = command.ExecuteReader();

                foreach (var row in reader)
                {
                    var listItem = new Pharmacy();
                    for (int i = 0; i < reader.FieldCount; ++i)
                    {
                        typeof(Pharmacy).GetProperty(reader.GetName(i))?.SetValue(listItem, reader.GetValue(i));
                    }
                    resultList.Add((Pharmacy)listItem);
                }
            }
            return resultList;
        }
    }
}

