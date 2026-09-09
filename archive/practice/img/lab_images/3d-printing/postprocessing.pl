			#!/usr/bin/perl -i                                                     
			use strict;
			use warnings;

			#create a backup file, only required for windows
			$^I = '.bak';

			while (<>) {
     				$_ =~ s/M126/M106/g; #replace all instances of M126 with M106
	 			$_ =~ s/M127/M107/g; #replace all instances of M127 with M107
     				print;
			}
		 
