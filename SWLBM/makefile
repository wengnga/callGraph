TARGET = LbmCavity3D
USER = $(shell whoami)
CC = sw5cc
LD = mpicc 

CFLAGS =  -O3 -host -I/usr/sw-mpp/mpi2/include/ -lm  -I/home/export/online3/swmore/opensource/swlu/include -L/home/export/online3/swmore/opensource/swlu/lib -lswlu_mpi

OBJ = LbmCavity3D.o Collide.o Parallel.o  Stream.o

LIB = lib/liblbm.a -I/home/export/online3/swmore/opensource/swlu/include -L/home/export/online3/swmore/opensource/swlu/lib -lswlu_mpi

$(TARGET): $(OBJ)
	$(LD) $(OBJ) $(LIB) -o $(TARGET) 
	rm $(OBJ)
	
%.o:%.c
	$(CC) $(CFLAGS) -c $<

run:
	bsub -I -b -q q_sw_share -cgsp 64 -n 128  -share_size 6500 -host_stack 500 -J test ./LbmCavity3D $(USER)

#-------------------------------------*
.PHONY : clean clear
clean:
	-rm -rf $(TARGET) $(OBJ) 
	
