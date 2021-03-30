# pull the current branch
git pull origin (git branch --show-current)
# git add,commit and push to your local branch // fit to jira
git add . && git commit -m (echo by (whoami) at (date) | string collect) && git push origin (git branch --show-current)
# delete all branchs except the current branch 
git branch | grep -v (git branch --show-current) | grep -v '^*' | xargs git branch -D # grep -v '^*'  and grep -v (git branch --show-current) doing the some => supposed to get the current branch
# clone only development
git clone --single-branch --branch development https://morbargig@bitbucket.org/ideodigital/wsi-client.git