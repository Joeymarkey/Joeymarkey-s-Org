import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SearchStudentsProps {
  onSearch: (searchType: string, searchTerm: string) => void;
}

export function SearchStudents({ onSearch }: SearchStudentsProps) {
  const [searchType, setSearchType] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    onSearch(searchType, term);
  };

  const handleTypeChange = (type: string) => {
    setSearchType(type);
    if (searchTerm) {
      onSearch(type, searchTerm);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="w-5 h-5" />
          Search Students
        </CardTitle>
        <CardDescription>
          Find student objects by different criteria
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="searchType">Search By</Label>
            <Select value={searchType} onValueChange={handleTypeChange}>
              <SelectTrigger id="searchType">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="id">Student ID</SelectItem>
                <SelectItem value="major">Major</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="searchTerm">Search Term</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="searchTerm"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder={`Search by ${searchType}...`}
                className="pl-9"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
