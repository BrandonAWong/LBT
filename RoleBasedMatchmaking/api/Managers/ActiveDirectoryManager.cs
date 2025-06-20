#pragma warning disable CA1416

using System.DirectoryServices;
using RoleDashboard.Models;

namespace RoleDashboard.Managers
{
    public class ActiveDirectoryManager
    {
        internal Dictionary<string, int> GetTitles()
        {
            DirectoryEntry entry = new($"LDAP://DC=corp,DC=lbtransit,DC=com");

            DirectorySearcher searcher = new(entry)
            {
                ReferralChasing = ReferralChasingOption.All,
                Filter = "(objectClass=user)",
                SearchScope = SearchScope.Subtree,
                PageSize = 10_000
            };

            searcher.PropertiesToLoad.Add("title");
            Dictionary<string, int> titles = new(StringComparer.OrdinalIgnoreCase);

            foreach (SearchResult result in searcher.FindAll())
            {
                if (result.Properties.Contains("title"))
                {
                    string? title = result.Properties["title"][0]?.ToString();

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

            entry.Close();
            return titles;
        }

        internal Dictionary<string, int> GetGroupsByTitle(string title)
        {
            DirectoryEntry entry = new($"LDAP://DC=corp,DC=lbtransit,DC=com");

            DirectorySearcher searcher = new(entry)
            {
                ReferralChasing = ReferralChasingOption.All,
                Filter = $"(&(objectClass=user)(title={title}))",
                SearchScope = SearchScope.Subtree,
            };

            searcher.PropertiesToLoad.Add("memberOf");
            Dictionary<string, int> groups = new(StringComparer.OrdinalIgnoreCase);

            foreach (SearchResult result in searcher.FindAll())
            {
                DirectoryEntry curEntry = result.GetDirectoryEntry();
                var memberOf = curEntry.Properties["memberOf"];

                if (memberOf == null || memberOf.Count <= 0)
                {
                    continue;
                }

                var userGroupList = memberOf.Cast<object>()
                    .Select(g => g?.ToString()?.Split(',').FirstOrDefault()?.Replace("CN=", string.Empty))
                    .Where(g => !string.IsNullOrWhiteSpace(g))
                    .Distinct();

                foreach (string group in userGroupList!)
                {
                    if (!groups.ContainsKey(group!))
                    {
                        groups[group!] = 0;
                    }

                    ++groups[group!];
                }
            }

            entry.Close();
            return groups;
        }

        internal Dictionary<string, List<string>> GetCommonGroupsForAllTitles()
        {
            IEnumerable<string> titles = GetTitles().Select(t => t.Key);
            Dictionary<string, List<string>> commonGroups = new();

            foreach (string title in titles)
            {
                Dictionary<string, int> groupCounts = GetGroupsByTitle(title);

                if (groupCounts.Count > 0)
                {
                    int maxNumUsers = groupCounts.Select(gc => gc.Value).Max();
                    commonGroups[title] = groupCounts
                        .Where(gc => gc.Value == maxNumUsers)
                        .Select(gc => gc.Key)
                        .ToList();
                }
            }

            return commonGroups.OrderBy(g => g.Key).ToDictionary();
        }

        internal List<AdUser> GetAllUsers()
        {
            DirectoryEntry entry = new($"LDAP://DC=corp,DC=lbtransit,DC=com");

            DirectorySearcher searcher = new(entry)
            {
                ReferralChasing = ReferralChasingOption.All,
                Filter = "(objectClass=user)",
                SearchScope = SearchScope.Subtree,
                PageSize = 10_000
            };

            searcher.PropertiesToLoad.AddRange(["displayName", "sAMAccountName",
                "userPrincipalName", "department", "title"]);
            List<AdUser> users = new();

            foreach (SearchResult result in searcher.FindAll())
            {
                if (result.Properties.Contains("title"))
                {
                    users.Add(new AdUser
                    {
                        Name = GetAdProperty(result, "displayName"),
                        UserId = GetAdProperty(result, "sAMAccountName"),
                        Email = GetAdProperty(result, "userPrincipalName"),
                        Department = GetAdProperty(result, "department"),
                        Title = GetAdProperty(result, "title"),
                    });   
                }
            }

            return users.OrderBy(u => u.Title).ToList();
        }

        #region Helpers
        private string GetAdProperty(SearchResult result, string property)
        {
            if (result.Properties.Contains(property) && result.Properties[property].Count > 0)
            {
                return result.Properties[property][0]?.ToString() ?? string.Empty;
            }

            return string.Empty;
        }
        #endregion
    }
}