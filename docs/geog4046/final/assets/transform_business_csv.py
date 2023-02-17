import csv



codes = [
    '1105 - FULL SVC RESTAURANTS (TABLE SERVICE)',
    '1126 - DRINKING PLACES (ALCOHOLIC BEVERAGES)',
    '2062 - LIMITED SVC RESTAURANTS(NO TABLE SVC)',
]

data = list()
with open("active-occupational-licenses-all.csv", "r") as openf:
    reader = csv.DictReader(openf)
    for row in reader:
        if row['Priority'] != "HIGH":
            continue
        if row["BusinessType"] not in codes:
            continue
        data.append(row)

print ("\n---- BY BUSINESS TYPE ----")
type_count = {}
for row in data:
    btype = row["BusinessType"]
    if btype in type_count:
        type_count[btype] += 1
    else:
        type_count[btype] = 1
type_totals = []
for k, v in type_count.items():
    type_totals.append((k, v))

sorted_totals = sorted(type_totals, key=lambda tup: tup[1], reverse=True)

for i in sorted_totals[:5]:
    print(i)

print ("\n---- BY NORMALIZED OWNER NAME ----")
owner_count = {}
for row in data:
    blicense = row["BusinessLicenseNumber"]
    baddr = row["MailAddress"]
    bname = row["BusinessName"]
    bowner = row["OwnerName"]
    clean_bowner = bowner
    strip_chars = [",", ".", "/", " ", "'", '"', "-", "_", "&", " AND "]
    for i in strip_chars:
        clean_bowner = clean_bowner.replace(i, "")
    if clean_bowner in owner_count:
        owner_count[clean_bowner].append((bowner, bname))
        # owner_count[clean_bowner].append(blicense)
    else:
        owner_count[clean_bowner] = [(bowner, bname)]
        # owner_count[clean_bowner] = [blicense]

owner_totals = []
for k, v in owner_count.items():
    owner_totals.append((k, v))

sorted_owners = sorted(owner_totals, key=lambda tup: len(tup[1]), reverse=True)

for i in sorted_owners:
    if len(i[1]) == 1:
        break
    print(i[0], len(i[1]))
    for b in i[1]:
        print("  ", b)

print ("\n---- BY MAILING ADDRESS ----")
addr_count = {}
for row in data:
    baddr = row["MailAddress"]
    bname = row["BusinessName"]
    bowner = row["OwnerName"]
    blicense = row["BusinessLicenseNumber"]
    if baddr in addr_count:
        addr_count[baddr].append((bowner, bname))
        # addr_count[baddr].append(blicense)
    else:
        addr_count[baddr] = [(bowner, bname)]
        # addr_count[baddr] = [blicense]

addr_totals = []
for k, v in addr_count.items():
    addr_totals.append((k, v))

sorted_addrs = sorted(addr_totals, key=lambda tup: len(tup[1]), reverse=True)

for i in sorted_addrs:
    if len(i[1]) == 1:
        break
    print(i[0], len(i[1]))
    for b in i[1]:
        print("  ", b)

combined_lists = []
for item in sorted_addrs:
    if len(item[1]) > 1:
        combined_lists.append(item[1])
for item in sorted_owners:
    if len(item[1]) > 1:
        combined_lists.append(item[1])

print(len(combined_lists))

final_rows = list()
for row in data:
    license = row["BusinessLicenseNumber"]
    for l in combined_lists:
        if license in l:
            row["RelatedLicenses"] = ";".join([i for i in l if not i == license])
    year = int(row["BusinessStartDate"][-4:])
    if year >= 1960 and year < 1970:
        datecat = "1960s"
    elif year >= 1970 and year < 1980:
        datecat = "1970s"
    elif year >= 1980 and year < 1990:
        datecat = "1980s"
    elif year >= 1990 and year < 2000:
        datecat = "1990s"
    elif year >= 2000 and year < 2006:
        datecat = "2000 - 2005"
    elif year >= 2006 and year < 2011:
        datecat = "2006 - 2010"
    elif year >= 2011 and year < 2016:
        datecat = "2011 - 2015"
    elif year >= 2016 and year < 2021:
        datecat = "2016 - 2020+"
    else:
        print("ERROROROR " + str(year))
    
    row["DateCategory"] = datecat
    
    owner_name = row["OwnerName"].upper()
    strip_chars = [",", ".", "/", " ", "'", '"', "-", "_", "&", " AND "]
    for i in strip_chars:
        owner_name = owner_name.replace(i, "")
    if "LLC" in owner_name:
        o_cat = "LLC"
    elif "INC" in owner_name:
        o_cat = "Inc."
    elif "CORP" in owner_name:
        o_cat = "Corp."
    else:
        o_cat = "Other"
    row["OwnerCategory"] = o_cat
    
    final_rows.append(row)

fieldnames = sorted(list(data[0].keys()))
fieldnames.append("RelatedLicenses")
fieldnames.append("DateCategory")
fieldnames.append("OwnerCategory")
with open("output2.csv", "w", newline="") as out:
    writer = csv.DictWriter(out, fieldnames=fieldnames)
    writer.writeheader()
    for row in final_rows:
        writer.writerow(row)
    