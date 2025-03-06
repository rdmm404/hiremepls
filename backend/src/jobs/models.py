"""
JUST SOME IDEAS I HAD
job descriptions should be stored in an independent table, not specific to a user
url should be an index (i'll have to remove query params and such)
this way i can check first if I have generated the job description first, before trying to generate
it again. Maybe it could happen that the description or something gets updated. I'll have to think
about it.

and then also what happens if a user wants to update something on it? it would get updated for
everyone. maybe i should just implement a cache?

or i could have an applications_override table that has updates per user. but then also the user updates
could probably be valid.

eeeh it's probably better to keep it separate. at the end of the day the point is to have an application tracker
not anything else

the llm thing is just a starting point but i should be able to edit whatever i fkn want on my applications
"""
