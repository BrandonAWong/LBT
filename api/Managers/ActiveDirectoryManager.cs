using System.DirectoryServices;
using System.DirectoryServices.ActiveDirectory;

namespace RoleDashboard.Managers
{
    public class ActiveDirectoryManager
    {
        public Dictionary<string, int> GetTitles()
        {
            DirectoryEntry entry = new() { Username = "!ActiveDirectory", Password = "wth12345" };
            DirectorySearcher searcher = new(entry);
            searcher.Filter = "(&(objectCategory=person)(objectClass=user)(title=*))";
            searcher.PropertiesToLoad.Add("title");
            SearchResultCollection results = searcher.FindAll();
            Dictionary<string, int> titles = new(StringComparer.OrdinalIgnoreCase);

            foreach (SearchResult result in results)
            {
                if (result.Properties.Contains("title"))
                {
                    string title = result.Properties["title"][0].ToString();

                    if (!string.IsNullOrWhiteSpace(title))
                    {
                        if (!titles.ContainsKey(title))
                        {
                            titles[title] = 0;
                        }

                        ++titles[title];
                    }
                }
            }

            return titles;
        }
    }
}