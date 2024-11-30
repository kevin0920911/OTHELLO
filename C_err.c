#include <stdio.h>
#include <stdlib.h>
#include <string.h>
int check_user(char *,char *);
void insert(void);
void hacker(void);
char pass[]="1030451",username[]="ADMIN";

int main(int argc,char**argv)
{
    if(check_user(argv[1],argv[2])==0)
    {
        printf("Error username or password!\n");
    }
    else
    {
		printf("Welcome to the system of merchandise price.\n");
        insert();
    }
    return 0;
}
int check_user(char *in1,char *in2)
{
    char Uname[20], Upass[20];
    strcpy(Uname,in1);
    strcpy(Upass,in2);
    if(!strcmp(Uname,username)&&!strcmp(Upass,pass))
    {
        return 1;
    }
    else
    {
        return 0;
    }
}
void insert(void)
{
	int data_price[50],idnum,tmp;
	printf("Please input the merchandise number:");
	scanf("%d",&idnum);
	printf("Please input the %d th merchandise price:",idnum);
	scanf("%d",&tmp);
	data_price[idnum]=tmp;
	
	printf("The %d th merchandise price is %d",idnum,data_price[idnum]);
}
void hacker(void)
{
    printf("Augh! I have been hacked!\n");
	system("/usr/bin/xclock");
}
